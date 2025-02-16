"use client";

import { registerUser } from "@/actions/auth";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
	message: "",
};

const SignupPage = () => {
	const [state, action, pending] = useActionState(registerUser, initialState);

	return (
		<div className="bg-white rounded-md border p-4 w-full shadow-sm">
			<div className="text-2xl text-black/70">Sign up</div>
			<form action={action} className="flex flex-col gap-4 mt-4">
				<Input name="email" variant="flat" label="Email" />
				<Input
					variant="faded"
					name="password"
					label="Password"
					type="password"
				/>
				<div className="text-end">
					<Button
						type="submit"
						variant="solid"
						color="primary"
						isLoading={pending}
					>
						Signup
					</Button>
				</div>
				<div className="text-center text-sm text-black/50">
					Already have an account?{" "}
					<Link href="/signin" className="text-blue-500">
						Sign in
					</Link>
				</div>

				{state.message && (
					<div className="text-red-500 text-sm">{state.message}</div>
				)}
			</form>
		</div>
	);
};

export default SignupPage;
