import confetti from 'canvas-confetti';
import { Options } from 'canvas-confetti';

type FireFn = (particleRatio?: number, opts?: Options) => void;
type TReturn = { fireConfetti: FireFn; realisticConfetti: () => void };

function randomInRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

const defaultOpts: Options = {
	spread: randomInRange(50, 70),
};

export const useConfetti = (particleNumber: number): TReturn => {
	//Customizable Confetti
	const fireConfetti: FireFn = (particleRatio = 1, opts = defaultOpts) => {
		confetti({
			origin: { y: 0.7 },
			particleCount: Math.floor(particleNumber * particleRatio),
			...opts,
		});
	};
	//Fire realistic Confetti
	const realisticConfetti = () => {
		fireConfetti(0.25, {
			spread: 26,
			startVelocity: 55,
		});
		fireConfetti(0.2, {
			spread: 60,
		});
		fireConfetti(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		});
		fireConfetti(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		});
		fireConfetti(0.1, {
			spread: 120,
			startVelocity: 45,
		});
	};

	return { fireConfetti, realisticConfetti };
};
