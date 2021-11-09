import React from "react";
import styles from './Button.module.css';

export const Button = ({ onClick, children, id }) => {
	return (
		<button onClick={onClick} className={styles.Button} id={id}>
			{children}
		</button>
	);
}