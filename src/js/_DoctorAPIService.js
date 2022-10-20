const axios = require('axios').default;

export class DoctorAPIService {
    constructor() {
    }

    static async login(email, password) {
        try {
            const {data} = await axios.post('https://ajax.test-danit.com/api/v2/cards/login', {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            return data;
        } catch (e) {
            return e;
        }
    }

    static async getAllCards() {
        try {
            const {data} = await axios.get('https://ajax.test-danit.com/api/v2/cards', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return data
        } catch (e) {
            console.log(e.response.data);
        }
    }

    static async deleteCard(cardID) {
        try {
            await axios.delete(`https://ajax.test-danit.com/api/v2/cards/${cardID}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            )
        } catch (e) {
            console.log(e.response.data)
        }
    }

    static async createCard(card) {
        const jsonCard = JSON.stringify(card);
        try {
            const {data: card} = await axios.post('https://ajax.test-danit.com/api/v2/cards',
                jsonCard
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
            return card;
        } catch (e) {
            console.log(e.response.data);
        }
    }

    static async updateCard(cardID, card) {
        const jsonCard = JSON.stringify(card);
        try {
            const {data: card} = await axios.put(`https://ajax.test-danit.com/api/v2/cards/${cardID}`,
                jsonCard,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
            return card;
        } catch (e) {
            console.log(e.response.data);
        }
    }
}