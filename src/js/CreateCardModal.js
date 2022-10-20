import {CardModal} from "./CardModal";
import {DoctorAPIService} from "./_DoctorAPIService";
import {Desk} from "./Desk";
import {Modal} from "./_modal";

export class CreateCardModal extends CardModal {
    constructor() {
        super();
        this.renderModalWrapper('Create');
    }
    attachListener() {
        super.attachListener();
        const form = this.modalWrapper.querySelector(".modal-content");
        form.addEventListener("submit", (event)=>{
            event.preventDefault();
            this.createVisit();
        });
        
    }
    async createVisit() {
        const specialist = document.querySelector(".specialist");
        if (specialist.value === "specialist") {
            const errorSpan = document.querySelector(".eror-message");
            errorSpan.classList.remove("hiden");
        } else {
            const allItem = document.querySelectorAll(".formInput");
            const visit = {};
            allItem.forEach((element) => {
                visit[element.dataset.name] = element.value;
            });
            const card = await DoctorAPIService.createCard(visit);
            Desk.drawVisitArr([card]);
            Modal.removeModal();
        }
    }
}