import { BtnOperation } from "./BtnOperation";
import { DoctorAPIService } from "./_DoctorAPIService";
import { Modal } from "./_modal";
import { Desk } from "./Desk";

export class LoginModal extends Modal {
	constructor() {
		super();
		this.renderModalWrapper();
	}

	renderModalWrapper() {
		super.renderModalWrapper();
		this.modalWrapper.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Enter your email and password to login</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите свой e-mail">
          </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Введите свой пароль">
			  <i class="show-pass fas fa-eye-slash"></i> 
            </div>
            <div class="modal-footer">
              <button type="button" class="singin btn-primary me-md-2 btn" data-js="signInBtn" data-bs-dismiss="modal">Sign In</button>
            
          </div>`;
		this.attachListener();
	}
	attachListener() {
		const close = document.querySelector(`[aria-label="Close"]`);
		close.addEventListener("click", Modal.removeModal);

		this.showPassBtn = document.querySelector(".show-pass");
		this.showPassBtn.addEventListener("click", this.showPassword);

		const applyBtn = document.querySelector(".singin");
		applyBtn.addEventListener("click", this.login);
		this.loginModalContainer = document.querySelector(".modal-dialog");

		this.modalWrapper.addEventListener("click", function (e) {
			if (e.target.classList.contains("modal-wrapper")) {
				Modal.removeModal();
			}
		});
	}

	showPassword() {
		const inputPass = document.querySelector("#exampleInputPassword1");
		inputPass.type === "password"
			? (inputPass.type = "text")
			: (inputPass.type = "password");
		this.classList.toggle("fa-eye-slash");
		this.classList.toggle("fa-eye");
	}

	async login() {
		const mail = document.querySelector(`#exampleInputEmail1`);
		const pass = document.querySelector(`#exampleInputPassword1`);
		if (mail.value !== "" && pass.value !== "") {
			const token = await DoctorAPIService.login(mail.value, pass.value);

			if (token instanceof Error) {
				this.loginModalContent = document.querySelector(".modal-content");
				console.log(this.loginModalContent);

				const errorSpan = document.createElement("span");
				errorSpan.classList.add("eror-message");
				console.log(errorSpan);
				errorSpan.innerHTML = "Incorrect Email or Password entered. Try again!";
				this.loginModalContent.prepend(errorSpan);
			} else {
				localStorage.setItem("token", token);
				Modal.removeModal();
				BtnOperation.showCreateVisitBtn();
				Desk.drawAllCard();
			}
		}
	}
}
