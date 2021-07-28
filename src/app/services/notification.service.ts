import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as toaster from 'toastr';
import { EncrDecrService } from "./encrdecr.service";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {

    public NO_DATA = 'No Data Found';
    public notifications = [];
    public notificationsUpdate = new BehaviorSubject(false);
    public languages = [{name: 'English', value: 'en'}, {name: 'Hindi', value: 'de'}]

    constructor(private EncrDecr: EncrDecrService) {
        toaster.options.positionClass = "toast-bottom-right";
    }

    notifySucess(message: string) {
        toaster.success(message);
    }

    notifyError(message: string) {
        toaster.error(message);
    }

    addNotification(userName: string, type: string) {
        this.notifications.push("user " + userName + ' has been ' + type);
        this.notificationsUpdate.next(true);
    }

    addLocalStorage(key: string, value: string){
        return localStorage.setItem(key, this.EncrDecr.set(value))
    }

    getLocalStorage(key: string) {
        return localStorage.getItem(key) ? JSON.parse(this.EncrDecr.get(localStorage.getItem(key))) : {}
    }
}