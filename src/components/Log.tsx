"use client";

import { config } from "@/config";

interface LogProps {
	children: any[];
}

export function Log({ children }: LogProps) {
	console.log(...children);

	return null;
}
