import express from 'express';
import cors from 'cors';

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];
let monthlyHolidays;
const today = new Date().toLocaleDateString();
const server = express();

server.use(cors());
server.listen(5000);

server.get('/holidays', (req, resp) => {
    resp.send(holidays);
});

server.get('/is-today-holiday', (req, resp) => {
    resp.send(checkToday())
});

function checkToday() {
    for(let i = 0; i < holidays.length; i ++) {
        if(holidays[i].date === today) {
            return `Sim, hoje é ${holidays[i].name}`;
        }
    }
    return "Não, hoje não é feriado";
}

server.get('/holidays/:month', (req, resp) => {
    const month = req.params.month;

    function filtering(holiday) {
        return holiday.date.split("/")[0] === month
    }

    monthlyHolidays = holidays;
    resp.send(monthlyHolidays.filter(filtering));
});