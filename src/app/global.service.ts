import { Injectable, Directive } from '@angular/core';

@Injectable({
    providedIn: 'root'  // <- ADD THIS
})
export class GlobalPermissionsService {
    private collection: boolean;
  
    constructor() { }

    setCollectionPermission(val) {
        this.collection = val;
    }

    getCollectionPermission() {
        return this.collection;
    }
  }