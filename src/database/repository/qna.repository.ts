import { Repository, EntityRepository } from "typeorm";
import { Qna } from "../entity/qna.entity";

@EntityRepository(Qna)
export class QnaRepository extends Repository<Qna> {

}