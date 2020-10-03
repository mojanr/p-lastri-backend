import { Repository, EntityRepository } from "typeorm";
import { Submission } from "../entity/submission.entity";

@EntityRepository(Submission)
export class SubmissionRepository extends Repository<Submission> {

}