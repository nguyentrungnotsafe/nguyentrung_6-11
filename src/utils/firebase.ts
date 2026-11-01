import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import config from '../../firebase-applet-config.json';
import { Wish } from '../types';

const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];

export const db = config.firestoreDatabaseId
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

const WISHES_COLLECTION = 'wishes';
const LOCAL_STORAGE_KEY = 'trung_birthday_wishes_saved_v3';

/**
 * Listens for real-time wishes from Firebase Firestore.
 * Automatically syncs to localStorage and invokes callback.
 */
export const subscribeToWishes = (callback: (wishes: Wish[]) => void) => {
  try {
    const q = query(collection(db, WISHES_COLLECTION), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedWishes: Wish[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetchedWishes.push({
            id: docSnap.id,
            author: data.author || 'Bạn thân',
            role: data.role || 'Bạn thân',
            content: data.content || '',
            stickerId: data.stickerId || 'cat_ribbon',
            timestamp: data.timestamp || Date.now(),
            likes: typeof data.likes === 'number' ? data.likes : 1
          });
        });

        // Cache locally
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedWishes));
        } catch {
          // ignore
        }

        callback(fetchedWishes);
      },
      (error) => {
        console.warn('Firestore subscription fallback to local cache:', error);
        // Fallback to local storage if Firestore connection encounters an issue
        try {
          const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (cached) {
            callback(JSON.parse(cached));
          }
        } catch {
          // ignore
        }
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error('Error in subscribeToWishes:', err);
    return () => {};
  }
};

/**
 * Adds a new wish to cloud Firestore and local cache.
 */
export const sendCloudWish = async (wish: Omit<Wish, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, WISHES_COLLECTION), {
      author: wish.author,
      role: wish.role,
      content: wish.content,
      stickerId: wish.stickerId,
      timestamp: Date.now(),
      likes: 1,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Failed to save to cloud:', error);
    // Fallback: save to local storage
    const localId = `local-${Date.now()}`;
    const newWish: Wish = { ...wish, id: localId };
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list = cached ? JSON.parse(cached) : [];
      list.unshift(newWish);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch {}
    return localId;
  }
};

/**
 * Likes a wish in cloud Firestore.
 */
export const likeCloudWish = async (wishId: string) => {
  try {
    const wishRef = doc(db, WISHES_COLLECTION, wishId);
    await updateDoc(wishRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.warn('Cloud like error:', error);
  }
};

/**
 * Deletes a wish from cloud Firestore.
 */
export const deleteCloudWish = async (wishId: string) => {
  try {
    const wishRef = doc(db, WISHES_COLLECTION, wishId);
    await deleteDoc(wishRef);
  } catch (error) {
    console.warn('Cloud delete error:', error);
  }
};
