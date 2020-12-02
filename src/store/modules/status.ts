import store from "@/store";
import { VuexModule, Module, Mutation, getModule, Action } from "vuex-module-decorators";
// Dto
import { Status } from "@/dto/api";
// Api
import Api from "@/api/";

@Module({ namespaced: true, name: "Statuses", store, dynamic: true })
class Statuses extends VuexModule {
  public statusMap = new Map();

  @Mutation
  private SET_STATUS_MAP(status: Status) {
    this.statusMap.set(status.id, status.name);
  }
  @Action
  async initProduct() {
    const ArrayStatus = await Api.getAllStatuses();
    for (const status of ArrayStatus) {
      this.SET_STATUS_MAP(status);
    }
  }
  get getStatusById() {
    return (id: number) => {
      return this.statusMap.get(id);
    };
  }
}
const StatusModule = getModule(Statuses);
export default StatusModule;
