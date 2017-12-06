import React from "react";
import { Actions, ActionConst, Scene, Router } from "react-native-router-flux";
import LoginForm from "components/LoginForm";
import ClientList from "components/client/ClientList";
import ClientCreate from "components/client/ClientCreate";
import ClientEdit from "components/client/ClientEdit";
import WeeklyData from "components/WeeklyData";
import SessionList from "components/session/SessionList";
import SessionCreate from "components/session/SessionCreate";
import SessionInfo from "components/session/SessionInfo";
import CodingChoice from "components/session/CodingChoice";
import PrePostChoose from "components/session/choices/PrePostChoose";
import CodingBegin from "components/session/choices/CodingBegin";
import PrePostForm from "components/forms/PrePostForm/PrePostForm";
import PrePostFollowup from "components/forms/PrePostForm/PrePostFollowup";
import CDIForm from "components/forms/CDIForm/CDIForm";
import CDIFollowup from "components/forms/CDIForm/CDIFollowup";
import PDIBegin from "components/forms/PDIForm/PDIBegin";
import PDIChairWarning from "components/forms/PDIForm/PDIChairWarning";
import PDIChildReady from "components/forms/PDIForm/PDIChildReady";
import PDIObey1 from "components/forms/PDIForm/PDIObey1";
import PDIObey2 from "components/forms/PDIForm/PDIObey2";
import PDIObey3 from "components/forms/PDIForm/PDIObey3";
import PDIParentConfirm from "components/forms/PDIForm/PDIParentConfirm";
import PDIPraise from "components/forms/PDIForm/PDIPraise";
import PDISummary from "components/forms/PDIForm/PDISummary";
import PDITimeoutChair from "components/forms/PDIForm/PDITimeoutChair";
import PDITimeoutRoom from "components/forms/PDIForm/PDITimeoutRoom";

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="main" initial>
				<Scene
					key="clientList"
					component={ClientList}
					title="Clients"
					onRight={() => Actions.clientCreate()}
					rightTitle="Add"
					initial
				/>
				<Scene key="clientCreate" component={ClientCreate} title="Create Client" />
				<Scene key="clientEdit" component={ClientEdit} title="Edit Client" />

				<Scene key="weeklyData" component={WeeklyData} title="Weekly Data"/>

				<Scene 
					key="sessionList" 
					component={SessionList} 
					title="Session Overview"
					onRight={() => Actions.sessionCreate()}
					rightTitle="New"
				/>
				<Scene key="sessionCreate" component={SessionCreate} title="Session Create" />
				<Scene key="sessionInfo" component={SessionInfo} title="Session Information" />

				<Scene key="codingChoice" component={CodingChoice} title="Select Coding Form" />
				<Scene key="prePostChoose" component={PrePostChoose} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="codingBegin" component={CodingBegin} title="Session Information" type={ActionConst.REPLACE} />


				<Scene key="prePostForm" component={PrePostForm} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="prePostFollowup" component={PrePostFollowup} title="Session Information" type={ActionConst.REPLACE} />

				<Scene key="cdiForm" component={CDIForm} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="cdiFollowup" component={CDIFollowup} title="Session Information" type={ActionConst.REPLACE} />

				<Scene key="pdiBegin" component={PDIBegin} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiChairWarning" component={PDIChairWarning} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiChildReady" component={PDIChildReady} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiObey1" component={PDIObey1} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiObey2" component={PDIObey2} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiObey3" component={PDIObey3} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiParentConfirm" component={PDIParentConfirm} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiPraise" component={PDIPraise} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiSummary" component={PDISummary} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiTimeoutChair" component={PDITimeoutChair} title="Session Information" type={ActionConst.REPLACE} />
				<Scene key="pdiTimeoutRoom" component={PDITimeoutRoom} title="Session Information" type={ActionConst.REPLACE} />
			</Scene>
		</Router>
	);
};

export default RouterComponent;
