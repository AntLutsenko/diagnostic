import {Modal} from "./_modal";
import {DoctorAPIService} from "./_DoctorAPIService";
import {CardModal} from "./CardModal";

export class UpdateCardModal extends CardModal {
    constructor(visit) {
        super();
        this.visit = visit;
        this.renderModalWrapper('Update');
        this.choseDoctor.value = visit.card.specialist;
        this.selectSpecialist();
        this.addInfo();
    }

    addInfo(){
        for (const cardItem in this.visit.card) {
            const allItem = document.querySelectorAll(".formInput");
            allItem.forEach((element) => {
                const data = this.visit.card[element.dataset.name];
                if(data) {
                    element.value = data;
                }
            });
        }
    }

    attachListener(){
        super.attachListener();

        const form = this.modalWrapper.querySelector(".modal-content");
        form.addEventListener("submit", (event)=>{
            event.preventDefault();
            this.updateVisit()
        });
    }

    async updateVisit() {
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
            this.newCard = await DoctorAPIService.updateCard(this.visit.card.id, visit);
            this.visit.card = this.newCard;
            this.visit.update();
            Modal.removeModal();
        }
    }
}
