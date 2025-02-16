"use client";
import { Button, type ButtonProps } from "@heroui/react";
import type { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
	children,
	...restProps
}: PropsWithChildren<ButtonProps>) {
	const { pending } = useFormStatus();

	return (
		<Button {...restProps} isLoading={pending} type="submit">
			{children}
		</Button>
	);
}
