export class AngularFirestoreMock {
    collection = (col: string) => ({
        add(obj: any) { return Promise.reject(); }
    })
}
