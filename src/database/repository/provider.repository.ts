import { Repository, EntityRepository } from "typeorm";
import { Provider } from "../entity/provider.entity";

@EntityRepository(Provider)
export class ProviderRepository extends Repository<Provider> {

}