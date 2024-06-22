import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);
	const [formValues, setFormValues] = useState({
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
	};

	return (
		<div className="sign-in p-4">
			<div className="d-flex align-items-start justify-content-between mb-4">
				<div>
					<span className="mdi mdi-account-circle-outline display-1 text-primary" />
					<h2
						style={{
							background: "transparent",
							color: "black",
							padding: "0",
							fontSize: "1.5rem",
							marginTop: "2rem",
						}}>
						Change Password
					</h2>
					<p className="text-muted mb-0">
						Welcome Back, You've
						<br />
						been missed!
					</p>
				</div>
			</div>
			<form>
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlEmail"
						className="form-label mb-1 label-custom-boot">
						Password
					</label>
					<div
						className="input-group border bg-white rounded-3 py-1"
						id="exampleFormControlPassword">
						<span
							className="input-group-text bg-transparent rounded-0 border-0"
							id="pass">
							<span className="mdi mdi-eye-outline mdi-18px text-muted" />
						</span>
						<input
							// i change the type = number to "text"
							type={showPass ? "text" : "password"}
							className="form-control bg-transparent rounded-0 border-0 px-0"
							placeholder="Type your password"
							aria-label="Type your email or Password number"
							aria-describedby="pass"
							onChange={(e) => {
								setFormValues((prev) => ({
									...prev,
									password: e.target.value,
								}));
							}}
						/>
						<span onClick={() => setShowPass(!showPass)}>
							{showPass ? (
								<IoEyeOutline
									style={{
										width: "2rem",
										padding: "5px",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										height: "100%",
									}}
								/>
							) : (
								<IoEyeOffOutline
									style={{
										width: "2rem",
										padding: "5px",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										height: "100%",
									}}
								/>
							)}
						</span>
					</div>
				</div>
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlEmail"
						className="form-label mb-1 label-custom-boot">
						Confirm Password
					</label>
					<div
						className="input-group border bg-white rounded-3 py-1"
						id="exampleFormControlPassword">
						<span
							className="input-group-text bg-transparent rounded-0 border-0"
							id="cPass">
							<span className="mdi mdi-eye-outline mdi-18px text-muted" />
						</span>
						<input
							// i change the type = number to "text"
							type={showCPass ? "text" : "password"}
							className="form-control bg-transparent rounded-0 border-0 px-0"
							placeholder="Type your confirm password"
							aria-label="Type your email or Password number"
							aria-describedby="cPass"
							onChange={(e) => {
								setFormValues((prev) => ({
									...prev,
									password: e.target.value,
								}));
							}}
						/>
						<span onClick={() => setShowCPass(!showCPass)}>
							{showCPass ? (
								<IoEyeOutline
									style={{
										width: "2rem",
										padding: "5px",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										height: "100%",
									}}
								/>
							) : (
								<IoEyeOffOutline
									style={{
										width: "2rem",
										padding: "5px",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										height: "100%",
									}}
								/>
							)}
						</span>
					</div>
				</div>
				<button
					onClick={handleClick}
					className="btn btn-info btn-lg w-100 rounded-4 mb-2">
					Change Password
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
