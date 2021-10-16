import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

// below code has been recfactored as react states have been managed using modx.
// date - 19th Aug, 2021.
export default observer(function ActivityList() {
  // mobx store.
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          <Segment>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
})
