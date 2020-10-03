import { Repository, EntityRepository } from "typeorm";
import { SubmissionRequirement } from "../entity/submission-requirement.entity";

@EntityRepository(SubmissionRequirement)
export class SubmissionRequirementRepository extends Repository<SubmissionRequirement> {

}