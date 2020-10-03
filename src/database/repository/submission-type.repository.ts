import { Repository, EntityRepository } from "typeorm";
import { SubmissionType } from "../entity/submission-type.entity";

@EntityRepository(SubmissionType)
export class SubmissionTypeRepository extends Repository<SubmissionType> {

}