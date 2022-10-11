import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import classes from "./Spinner.module.scss"

const Spinner = () => {
	const [needLoading, setNeedLoading] = useState(false)
	const { loading } = useSelector((state: RootState) => state)

	useEffect(() => {
		if (loading?.loading_count > 0) {
			setNeedLoading(true)
		} else {
			setNeedLoading(false)
		}
	}, [loading])

	if (needLoading) {
		return (
			<div className={classes.container}>
				<div className={classes.ldsSpinner}>
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
				</div>
			</div>
		)
	}

	return <div />
}

export default Spinner
