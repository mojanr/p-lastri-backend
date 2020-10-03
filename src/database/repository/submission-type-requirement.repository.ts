import { Repository, EntityRepository } from "typeorm";
import { SubmissionTypeRequirement } from "../entity/submission-type-requirement.entity";

@EntityRepository(SubmissionTypeRequirement)
export class SubmissionTypeRequirementRepository extends Repository<SubmissionTypeRequirement> {

}