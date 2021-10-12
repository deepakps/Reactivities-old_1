export interface IDuck {
    name: string,
    numLegs: number,
    // makeSound?: (sound: string) => void;
    makeSound: (sound: string) => void;
}

// let data: any = 42;
// let data: number | string = 42;

// data = '41'

const duck1: IDuck = {
    name: 'Phani',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
};

const duck2: IDuck = {
    name: 'Prateek',
    numLegs: 2,
    // makeQuack: (sound: any) => console.log(sound);
    makeSound: (sound: any) => console.log(sound)
};

// duck1.makeSound!('Quack!');
duck1.makeSound('Quack!');

export const ducks = [duck1, duck2];