import client from "../../../shared/database-config";

import { Client } from "../../../client/domain/models/client";
import { EmpresaRepository } from "../../domain/repositories/empresa_repository";

export class ImplEmpresaRepository implements EmpresaRepository {
  async getEnterprise(): Promise<Client[]> {
    const res = await client.query("SELECT * FROM mst_empresa");
    const client_wows = res.rows;
    let client_data: Client[] = client_wows[0];
    return client_data
  }
}
