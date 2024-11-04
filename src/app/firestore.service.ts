import { Injectable, inject } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class FireStoreService<T extends { id?: string }> {
  protected readonly firestore = inject(AngularFirestore);
  protected readonly collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  collection(queryFn?: QueryFn) {
    return this.firestore.collection<T>(this.collectionName, queryFn);
  }

  getSnapshotChanges(queryFn?: QueryFn) {
    return this.firestore
      .collection<T>(this.collectionName, queryFn)
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((d) => {
            const data: T = { id: d.payload.doc.id, ...d.payload.doc.data() };
            return data;
          })
        )
      );
  }

  add(data: T) {
    return from(this.firestore.collection<T>(this.collectionName).add(data));
  }

  update(data: T) {
    return from(
      this.firestore
        .collection<T>(this.collectionName)
        .doc(data.id)
        .update(data)
    );
  }

  delete(data: T) {
    return from(
      this.firestore.collection<T>(this.collectionName).doc(data.id).delete()
    );
  }
}
