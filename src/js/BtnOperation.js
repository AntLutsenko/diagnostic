import { LoginModal } from "./_loginModal";
import { Desk } from "./Desk";
import { CreateCardModal } from "./CreateCardModal";

export class BtnOperation {
	constructor() {
		this.checkIsLogged();
		this.attachListener();
	}
	static hideElement(selector) {
		let element = document.querySelector(selector);
		element.classList.toggle("hiden");
	}
	static showCreateVisitBtn() {
		this.hideElement(".btn-login");
		this.hideElement(".btn-create-visit ");
		this.hideElement(".btn-logOUT ");
	}
	checkIsLogged() {
		if (localStorage.getItem("token") !== null) {
			this.token = localStorage.getItem("token");
			BtnOperation.showCreateVisitBtn();
			Desk.drawAllCard();
		}
	}
	attachListener() {
		const openLoginModal = document.querySelector(".btn-login");
		openLoginModal.addEventListener("click", () => {
			new LoginModal();
		});

		const logOutBtn = document.querySelector(".btn-logOUT");
		logOutBtn.addEventListener("click", this.logOut);
		const showCardBtn = document.querySelector(".btn-create-visit");
		showCardBtn.addEventListener("click", () => {
			new CreateCardModal();
		});
	}
	logOut() {
		localStorage.removeItem("token");
		BtnOperation.showCreateVisitBtn();
		const emptyLabel = document.querySelector(".desk__empty");
		Desk.cleanDesk();
		emptyLabel.classList.remove("hiden");
	}
}
