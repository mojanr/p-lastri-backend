import { Repository, EntityRepository } from "typeorm";
import { Service } from "../entity/service.entity";

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {

}