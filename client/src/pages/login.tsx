import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import { ThemedTitleV2 } from "@refinedev/mui";

import { yariga } from "assets";

import { CredentialResponse } from "../interfaces/google";

// TODO is need to get the google client id in my account
// 1. Access this link: https://console.cloud.google.com/getting-started?project=myfirstapp-ab156
// 2. From the top left corner click the dropdown button
// 3. Click New Project
// 4. Input the information needed
// 5. After the project is created you can select the project
// 6. On the left side bar click the APIs & Services
// 7. On the side bar again click the OAuth consent screen
//		S1 OAuth consent screen
//		Click External >> Create
//			Input Information >> App Name, User Support Email, Developer Email
//			Click Save and Continue
//		S2 Scope
//			Just Click Save & Continue
// 		S3 Test Users
//			Just Click Save & Continue
// 		S4 Summary
//			Just Click Back to Dashboard
// 8. On the side bar in left corner click Credential
//		On the top Click Create Credential
// 		Click OAuth client ID
//			Input Information
//				Application type: Web Application
//				App Name: Yariga
//				Authorized Javascript origin same on the Authorized redirect URI
//					URI1: http://localhost:3000
//					URI2: http://localhost
// 9. Copy the client Id & client secret key

export const Login: React.FC = () => {
	const { mutate: login } = useLogin<CredentialResponse>();

	const GoogleButton = (): JSX.Element => {
		const divRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
			if (
				typeof window === "undefined" ||
				!window.google ||
				!divRef.current
			) {
				return;
			}

			try {
				window.google.accounts.id.initialize({
					ux_mode: "popup",
					client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
					callback: async (res: CredentialResponse) => {
						if (res.credential) {
							login(res);
						}
					},
				});
				window.google.accounts.id.renderButton(divRef.current, {
					theme: "filled_blue",
					size: "medium",
					type: "standard",
				});
			} catch (error) {
				console.log(error);
			}
		}, []);

		return <div ref={divRef} />;
	};

	return (
		<Container
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				display="flex"
				gap="36px"
				justifyContent="center"
				flexDirection="column"
			>
				{/* <ThemedTitleV2
					collapsed={false}
					wrapperStyles={{
						fontSize: "22px",
						justifyContent: "center",
					}}
				/> */}

				<GoogleButton />

				<Typography
					align="center"
					color={"text.secondary"}
					fontSize="12px"
				>
					Powered by
					<img
						style={{ padding: "0 5px" }}
						alt="Yariga Logo"
						src={yariga}
					/>
					Google
				</Typography>
			</Box>
		</Container>
	);
};
