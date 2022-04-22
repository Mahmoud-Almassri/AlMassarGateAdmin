export class DashboardResponse {
    public dashboards: DashboardModel[];
    public charts: ChartModel;
}
export class DashboardModel {
    public name: string;
    public value: string;
    public url: string;
    public icon: string;
}

export class ChartModel {
    public numberOfApprovals: number[];
    public numberOfUsers: number[];
    public maximumNumberOfApprovalsDate: Date;
    public maximumNumberOfUsersDate: Date;
}
