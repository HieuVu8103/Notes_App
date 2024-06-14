import Note from '../models/note';
import Label from '../models/label';
import Edit from '../models/edit';
import Folder from '../models/folder';

export const LABELS = [
    new Label('l1', 'React Native'),
    new Label('l2', 'Final Exam'),
    new Label('l3', 'Mini Project'),
    new Label('l4', 'Team Work'),
    new Label('l5', 'React Basic'),
];

export const COLORS = [
    'lightseagreen',
    'skyblue',
    'lightcoral',
    'lightpink',
    'lightgreen',
    'lightblue',
    'orange',
    'palegreen',
];

export const NOTES = [
    new Note(
        'n1',
        null,
        ['l1', 'l2'],
        'Final Project Preparation',
        new Date('2024-6-08T12:30:00'),
        false
    ),
    new Note(
        'n2',
        COLORS[3],
        ['l3'],
        'For our mini project!',
        new Date('2024-5-10T12:35:00'),
        true
    ),
    new Note(
        'n3',
        COLORS[4],
        ['l2'],
        'Second note!',
        new Date('2024-4-20T15:30:00'),
        false
    ),
    new Note(
        'n4',
        COLORS[5],
        ['l1'],
        'Ok the first note here!',
        new Date('2024-4-20T12:25:00'),
        false
    ),
];

export const TRASH = [
    new Note(
        'n5',
        null,
        ['l1', 'l2'],
        'Tran Quang Huong Hihi',
        new Date('2024-6-08T12:30:00'),
        false,
        new Date('2024-7-08T12:30:00')
    ),
];

export const FOLDERS = [
    new Folder("f1", "Week1", new Date('2024-6-14T12:30:00'),),
    new Folder("f2", "Week2", new Date('2024-7-08T12:30:00')),
];


export const EDITNAME = [
    new Edit('clipboard-outline', 'Copy to Clipboard'),
    new Edit('share-social-outline', 'Share'),
    new Edit('trash-outline', 'Delete'),
    new Edit('copy-outline', 'Make a copy'),
    new Edit('pin-outline', 'Pin'),
    new Edit('alarm-outline', 'Add a reminder'),
];
