// import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    title = 'Hello from MobX, ';
    // activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    //loadingInitial is set to true to resolve flickering issue on load of an application.
    //loadingInitial is commented from loadActivities. (13th Sept, 2021).
    loadingInitial = true;

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     setTitle: action
        //     // we can use of below statement in case we don't want use arrow function.
        //     // below statement indicates we have to bind the function first with class and then make use of the same.
        //     // when we use arrow function it automatically gets bound to the class.
        //     // setTitle: action.bound
        // });

        // makeAutoObservable automatically understand class property and functions.
        makeAutoObservable(this);
    }

    // function to sort the activities by dates.
    // date - 18th Aug, 2021.
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    // function to sort the activities by dates.
    // date - 13th Oct, 2021.
    get groupedActivities() {
        console.log(this.activitiesByDate.values);
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                console.log(activities);
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        );
    }

    setTitle = () => {
        this.title = this.title + 'Leo!';
    }

    // function to load all the activities from agent.ts using mobx store.
    // date - 18th Aug, 2021.
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    }

    // function to load the activity from agent.ts using mobx store.
    // if activity is not present then it will be fetched from te API.
    // date - 24th Sept, 2021.
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    // private function to set the activity.
    // date - 24th Sept, 2021.
    setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    // private function to get the activity.
    // date - 24th Sept, 2021.
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    // below method is the another alternative for runInAction method just to avoid mobx warning.
    // the mobx feature "enforce actions / strict mode", which basically enforces that any 
    // modification to the state must happen inside of an action.
    // date - 19th Aug, 2021.
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    /*
    // function to select particular activity from agent.ts using mobx store.
    // date - 19th Aug, 2021.
    selectActivity = (id: string) => {
        // this.selectedActivity = this.activities.find(a => a.id === id);
        this.selectedActivity = this.activityRegistry.get(id);
    }

    // function to cancel the activity from agent.ts using mobx store.
    // date - 19th Aug, 2021.
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    // function to open the activities from agent.ts using mobx store.
    // date - 19th Aug, 2021.
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    // function to close the activities from agent.ts using mobx store.
    // date - 19th Aug, 2021.
    closeForm = () => {
        this.editMode = false;
    }*/

    // function to create new activity mobx store.
    // date - 08th Sept, 2021.
    createActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // function to update new activity mobx store.
    // date - 12th Sept, 2021.
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // function to delete new activity mobx store.
    // date - 12th Sept, 2021.
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== id)];
                this.activityRegistry.delete(id);
                // if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}