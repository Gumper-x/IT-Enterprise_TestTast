import store from "@/store";
import { VuexModule, Module, Mutation, getModule, Action } from "vuex-module-decorators";
// Dto
import { Status } from "@/dto/api";
// Api
import Api from "@/api/";

@Module({ namespaced: true, name: "Statuses", store, dynamic: true })
class Statuses extends VuexModule {
  public statusMap = new Map();
  public statuses: Status[] = [];

  @Mutation
  private SET_STATUS_MAP(status: Status) {
    this.statusMap.set(status.id, status.name);
  }
  @Mutation
  private SET_STATUSES(statuses: Status[]) {
    this.statuses = statuses;
  }
  @Action
  async initProduct() {
    const ArrayStatus = await Api.getAllStatuses();
    this.SET_STATUSES(ArrayStatus);
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
