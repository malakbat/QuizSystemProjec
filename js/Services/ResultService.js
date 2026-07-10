import { Result } from "../models/Result.js";

export class ResultService {

    constructor() {

        this.storageKey = "results";

    }

    getAllResults() {

        const data = localStorage.getItem(this.storageKey);

        if (!data) {

            return [];

        }

        const plainResults = JSON.parse(data);

        return plainResults.map(result => {

            const newResult = new Result(

                result.studentId,

                result.examId,

                result.score,

                result.totalQuestions

            );

            newResult.id = result.id;
            newResult.percent = result.percent;
            newResult.date = result.date;

            return newResult;

        });

    }

    saveResult(result) {

        const results = this.getAllResults();

        results.push(result);

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(results)

        );

    }

    getStudentResults(studentId) {

        return this.getAllResults()

            .filter(result => result.studentId === studentId);

    }

}