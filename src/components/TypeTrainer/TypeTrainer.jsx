import React, { useEffect, useState } from "react";
import { getRandomItem } from "../../App";
import { Button } from "../Button/Button";
import styles from './TypeTrainer.module.css';

let wronc = 0;
let righc = 0;
let time = 0;
let timerId;
let currentChar;


export const TypeTrainer = React.memo(({ arrayOfTexts }) => {
	const [wrongCounter, setWrongCounter] = useState(0);
	const [rightCounter, setRightCounter] = useState(0);
	const [timer, setTimer] = useState(0);
	const [text, setText] = useState('');
	const startButton = document.getElementById('start-button');
	const finishButton = document.getElementById('finish-button');
	useEffect(() => {
		if (arrayOfTexts) {
			setText(getRandomItem(arrayOfTexts).replace('. ', '.'));
		}
	}, [arrayOfTexts])
	const textContainer = document.querySelector('.text-container');
	function compareChars(event) {
		if (event.key !== 'Shift' && event.key !== 'CapsLock') {
			if (event.key == text[righc]) {
				setRightCounter(righc + 1);
				currentChar.classList.remove(styles.rightChar);
				currentChar.classList.remove(styles.wrongChar);
				if (currentChar.nextElementSibling == null) {
					alert('YOU DONE WELL!');
					clearInterval(timerId);
					currentChar.classList.remove(styles.rightChar);
					currentChar.classList.remove(styles.wrongChar);
					window.removeEventListener('keydown', compareChars)
					return;
				}
				currentChar = currentChar.nextElementSibling;
				currentChar.classList.add(styles.rightChar);
				righc++;
			} else {
				setWrongCounter(wronc + 1);
				currentChar.classList.add(styles.wrongChar);
				wronc++;
			}
		}
	}

	function startGame(event) {
		currentChar = textContainer.firstChild;
		currentChar.classList.add(styles.rightChar);
		startButton.disabled = true;
		timerId = setInterval(() => { setTimer(time + 1); time++; }, 1000);
		window.addEventListener('keydown', compareChars)
	}

	function restartGame() {
		setRightCounter(0);
		setWrongCounter(0);
		wronc = 0;
		righc = 0;
		time = 0;
		clearInterval(timerId);
		currentChar.classList.remove(styles.rightChar);
		currentChar.classList.remove(styles.wrongChar);
		startButton.disabled = false;
		setText(getRandomItem(arrayOfTexts).replace('. ', '.'));
		window.removeEventListener('keydown', compareChars)
	}

	return (
		<div className={styles.TypeTrainer}>
			<div className='text-container'>
				{text.split('').map(function (char) {
					console.log(char);
					return (
						<span className={styles.char}>
							{char}
						</span>
					);
				}
				)}
			</div>
			<div className={styles.ControlCotainer}>
				<div>
					<img src="https://img.icons8.com/ios-filled/50/000000/center-direction.png" className={styles.smallPicture} /> Accuracy: {rightCounter / (rightCounter + wrongCounter) ?
						(100 * rightCounter / (rightCounter + wrongCounter)).toFixed(2) :
						100}%
				</div>
				<div>
					<img src="https://img.icons8.com/ios/50/000000/clock--v3.png" className={styles.smallPicture} />	Speed {(60 * (rightCounter) / timer) ?
						(60 * (rightCounter) / timer).toFixed(2)
						: 0} signs per minute
				</div>
				<Button onClick={startGame} id='start-button'>
					Start button
				</Button>
				<Button onClick={restartGame} id='finish-button'>
					Reset button
				</Button>
			</div>
		</div>
	);
}
)