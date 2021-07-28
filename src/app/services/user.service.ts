import { Injectable } from "@angular/core";
import { IAddUserData, IEditUserData, userCredentials } from "./models/user.model";
import { BehaviorSubject } from "rxjs";
import { DatePipe } from "@angular/common";
import { EncrDecrService } from "./encrdecr.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    public isUserLogged: boolean;
    public updateIsUserLogged = new BehaviorSubject(false);

    constructor(public datepipe: DatePipe, private EncrDecr: EncrDecrService) { }

    authenticateUser(data: userCredentials) {
        return this.loginValidation(data);
    }

    addUser(data: IAddUserData) {
        return this.addUserList(data);
    }

    getUsersList() {
        return this.getUserList();
    }

    userDetails(id: string) {
        return this.getUserDetails(id);
    }

    deleteUser(user: string) {
        return this.deleteUserList(user);
    }

    updateUser(data: IEditUserData, user: string) {
        return this.updateUserList(data, user);
    }

    loginValidation(data: userCredentials) {

        // Add into localstorage
        localStorage.setItem("isLogged",this.EncrDecr.set( "1"));
        this.updateIsUserLogged.next(true);

        // Find user name from email
        const userName = data.email.replace(new RegExp('@.*', 'ig'), '');
        localStorage.setItem("user", this.EncrDecr.set(JSON.stringify({ email: data.email, userName })))
        return true;
    }

    addUserList(data: IAddUserData) {
        const exsitingData: any = localStorage.getItem('userList') ? JSON.parse(this.EncrDecr.get(localStorage.getItem('userList'))) : [];

        var userId = Math.random().toString(36).substr(2, 9)
        let formattedDate = this.datepipe.transform(data.dob, 'MMM dd,yyyy');

        const newUserData: IAddUserData[] = [{ ...data, user: userId, formattedDate }, ...exsitingData]

        localStorage.setItem('userList', this.EncrDecr.set(JSON.stringify(newUserData)))
        return newUserData;
    }

    getUserList() {
        const exsitingData: any = localStorage.getItem('userList') ? JSON.parse(this.EncrDecr.get(localStorage.getItem('userList'))) : [];

        return exsitingData;
    }

    updateUserList(editData: IEditUserData, user: string) {
        let userData = this.getUserList();
        let userIndex = userData.findIndex((element) => { return element.user === user })
        userData[userIndex] = { ...userData[userIndex], ...editData };
        localStorage.setItem('userList', this.EncrDecr.set(JSON.stringify(userData)))

        return true;
    }

    deleteUserList(user: string) {
        let userData = this.getUserList();
        let userIndex = userData.findIndex((element) => { return element.user === user })
        userData.splice(userIndex, 1);
        localStorage.setItem('userList', this.EncrDecr.set(JSON.stringify(userData)))

        return true;
    }

    getUserDetails(user: string) {
        return this.getUserList().find((element) => { return element.user === user });
    }
}