import Api from "@/api/";

class StatusService {
  private statusMap = new Map();

  async init(): Promise<void> {
    const ArrayStatus = await Api.getAllStatuses();
    for (const status of ArrayStatus) {
      this.statusMap.set(status.id, status.name);
    }
  }
  getStatusById(id: number): string {
    return this.statusMap.get(id);
  }
}
export default new StatusService();
