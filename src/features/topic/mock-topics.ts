import type { Label, Message, Topic, User } from "@/lib/types";

export const currentUser: User = {
  id: "user-me",
  email: "rafal.kaminski@cmail.com",
  firstName: "Rafał",
  lastName: "Kamiński",
  createdAt: "2026-01-04T09:00:00.000Z",
};

const finn: User = {
  id: "user-finn",
  email: "finn.doherty@example.com",
  firstName: "Finn",
  lastName: "Doherty",
  createdAt: "2026-01-11T10:30:00.000Z",
};

const mara: User = {
  id: "user-mara",
  email: "mara.lindqvist@example.com",
  firstName: "Mara",
  lastName: "Lindqvist",
  createdAt: "2026-02-02T14:45:00.000Z",
};

const priya: User = {
  id: "user-priya",
  email: "priya.raman@example.com",
  firstName: "Priya",
  lastName: "Raman",
  createdAt: "2026-02-19T08:15:00.000Z",
};

const tomas: User = {
  id: "user-tomas",
  email: "tomas.serrano@example.com",
  firstName: "Tomás",
  lastName: "Serrano",
  createdAt: "2026-03-08T16:20:00.000Z",
};

const hana: User = {
  id: "user-hana",
  email: "hana.kobayashi@example.com",
  firstName: "Hana",
  lastName: "Kobayashi",
  createdAt: "2026-04-01T11:05:00.000Z",
};

const nkechi: User = {
  id: "user-nkechi",
  email: "nkechi.obi@example.com",
  firstName: "Nkechi",
  lastName: "Obi",
  createdAt: "2026-05-23T13:40:00.000Z",
};

export const users: User[] = [
  currentUser,
  finn,
  mara,
  priya,
  tomas,
  hana,
  nkechi,
];

/** Mirrors the labels hardcoded in `LabelList`. */
const workLabel: Label = { id: "work", name: "Work", color: "#3b82f6" };
const personalLabel: Label = {
  id: "personal",
  name: "Personal",
  color: "#22c55e",
};
const familyLabel: Label = { id: "family", name: "Family", color: "#f59e0b" };
const travelLabel: Label = { id: "travel", name: "Travel", color: "#8b5cf6" };
const healthLabel: Label = { id: "health", name: "Health", color: "#f43f5e" };

export const labels: Label[] = [
  workLabel,
  personalLabel,
  familyLabel,
  travelLabel,
  healthLabel,
];

/**
 * Each topic's participants are declared once and shared by reference with
 * every message in that topic, so the two lists cannot drift apart.
 */
const standupPeople: User[] = [priya, currentUser, tomas];
const invoicePeople: User[] = [nkechi, currentUser];
const designPeople: User[] = [hana, currentUser, mara, finn];
const dentistPeople: User[] = [nkechi, currentUser];
const lisbonPeople: User[] = [currentUser, tomas];
const sundayPeople: User[] = [hana, currentUser, priya];
const escalationPeople: User[] = [finn, mara, currentUser];
const gymPeople: User[] = [priya, currentUser];
const offsitePeople: User[] = [tomas, currentUser, finn, hana];

const escalationMessages: Message[] = [
  {
    id: "msg-escalation-1",
    creator: mara,
    participants: escalationPeople,
    subject:
      "Two testers hit this today: open a thread from the list, and the pane still shows whatever was selected before. Second click fixes it.",
    createdAt: "2026-10-08T08:12:00.000Z",
  },
  {
    id: "msg-escalation-2",
    creator: finn,
    participants: escalationPeople,
    subject: "Reproduced on my side. Only when the list was scrolled first.",
    createdAt: "2026-10-08T08:41:00.000Z",
  },
  {
    id: "msg-escalation-3",
    creator: currentUser,
    participants: escalationPeople,
    subject:
      "That smells like the reading pane reading a stale id rather than a render ordering problem.",
    createdAt: "2026-10-08T09:05:00.000Z",
  },
  {
    id: "msg-escalation-4",
    creator: mara,
    participants: escalationPeople,
    subject:
      "Agreed. The id in the URL is correct, so the pane is not deriving from it.",
    createdAt: "2026-10-08T10:22:00.000Z",
  },
  {
    id: "msg-escalation-5",
    creator: finn,
    participants: escalationPeople,
    subject: "Confirmed — it keeps a copy in local state and never resyncs.",
    createdAt: "2026-10-08T11:47:00.000Z",
  },
  {
    id: "msg-escalation-6",
    creator: currentUser,
    participants: escalationPeople,
    subject: "Then the fix is to drop that copy and read the id directly.",
    createdAt: "2026-10-08T13:30:00.000Z",
  },
  {
    id: "msg-escalation-7",
    creator: mara,
    participants: escalationPeople,
    subject: "Support bumped it to escalation, three more reports this hour.",
    createdAt: "2026-10-08T15:58:00.000Z",
  },
  {
    id: "msg-escalation-8",
    creator: finn,
    participants: escalationPeople,
    subject: "Patch is up. Still need someone to check the keyboard path.",
    createdAt: "2026-10-09T07:14:00.000Z",
  },
  {
    id: "msg-escalation-9",
    creator: currentUser,
    participants: escalationPeople,
    subject: "Arrow keys look right now. Shift-select across pages still lags.",
    createdAt: "2026-10-09T09:36:00.000Z",
  },
  {
    id: "msg-escalation-10",
    creator: mara,
    participants: escalationPeople,
    subject: "Let's ship the stale-id fix and track the lag separately.",
    createdAt: "2026-10-09T12:20:00.000Z",
  },
  {
    id: "msg-escalation-11",
    creator: finn,
    participants: escalationPeople,
    subject:
      "freelancer.chandansoni@gmail.com is picking up the follow-up ticket — adding him to the next thread.",
    createdAt: "2026-10-09T15:48:00.000Z",
  },
];

export const mockTopics: Topic[] = [
  {
    id: "topic-standup",
    subject: "Standup notes — week 46",
    creator: priya,
    participants: standupPeople,
    messages: [
      {
        id: "msg-standup-1",
        creator: priya,
        participants: standupPeople,
        subject:
          "Posting these early since I'm out Thursday. Blockers are listed at the bottom.",
        createdAt: "2026-11-10T07:45:00.000Z",
      },
      {
        id: "msg-standup-2",
        creator: tomas,
        participants: standupPeople,
        subject:
          "Nothing blocking on my end, the migration finished overnight.",
        createdAt: "2026-11-10T09:12:00.000Z",
      },
    ],
    lastMessageAt: "2026-11-10T09:12:00.000Z",
    label: workLabel,
    read: false,
    starred: false,
    archived: false,
  },
  {
    id: "topic-invoice",
    subject: "Invoice #4192 is overdue",
    creator: nkechi,
    participants: invoicePeople,
    messages: [
      {
        id: "msg-invoice-1",
        creator: nkechi,
        participants: invoicePeople,
        subject:
          "Accounts payable has it flagged. Can you confirm the PO number before Friday?",
        createdAt: "2026-11-09T17:40:00.000Z",
      },
    ],
    lastMessageAt: "2026-11-09T17:40:00.000Z",
    label: null,
    read: false,
    starred: true,
    archived: false,
  },
  {
    id: "topic-design-review",
    subject: "Reading pane spacing feels cramped at 1280px",
    creator: hana,
    participants: designPeople,
    messages: [
      {
        id: "msg-design-1",
        creator: hana,
        participants: designPeople,
        subject:
          "Screenshots attached in the ticket. The subject line collides with the date column.",
        createdAt: "2026-11-06T12:10:00.000Z",
      },
      {
        id: "msg-design-2",
        creator: mara,
        participants: designPeople,
        subject:
          "Only below 1366px? I can't reproduce on the larger breakpoint.",
        createdAt: "2026-11-06T14:02:00.000Z",
      },
      {
        id: "msg-design-3",
        creator: currentUser,
        participants: designPeople,
        subject:
          "It's the fixed date column. Making it shrink-to-fit solves it.",
        createdAt: "2026-11-07T08:05:00.000Z",
      },
    ],
    lastMessageAt: "2026-11-07T08:05:00.000Z",
    label: workLabel,
    read: true,
    starred: false,
    archived: false,
  },
  {
    id: "topic-dentist",
    subject: "Appointment moved to 18 Nov",
    creator: nkechi,
    participants: dentistPeople,
    messages: [
      {
        id: "msg-dentist-1",
        creator: nkechi,
        participants: dentistPeople,
        subject:
          "The 11th no longer works — we moved you to the 18th at 14:30. Reply to confirm.",
        createdAt: "2026-11-03T13:22:00.000Z",
      },
    ],
    lastMessageAt: "2026-11-03T13:22:00.000Z",
    label: healthLabel,
    read: true,
    starred: false,
    archived: false,
  },
  {
    id: "topic-lisbon",
    subject: "Lisbon flights — three options",
    creator: currentUser,
    participants: lisbonPeople,
    messages: [
      {
        id: "msg-lisbon-1",
        creator: currentUser,
        participants: lisbonPeople,
        subject: "Cheapest is the 06:40 but it means a night at the airport.",
        createdAt: "2026-10-27T20:15:00.000Z",
      },
      {
        id: "msg-lisbon-2",
        creator: tomas,
        participants: lisbonPeople,
        subject: "Take the midday one, I'll cover the difference.",
        createdAt: "2026-10-28T19:01:00.000Z",
      },
    ],
    lastMessageAt: "2026-10-28T19:01:00.000Z",
    label: travelLabel,
    read: true,
    starred: true,
    archived: false,
  },
  {
    id: "topic-sunday",
    subject: "Sunday lunch at mum's",
    creator: hana,
    participants: sundayPeople,
    messages: [
      {
        id: "msg-sunday-1",
        creator: hana,
        participants: sundayPeople,
        subject:
          "One o'clock, and she's asking whether you're bringing dessert.",
        createdAt: "2026-10-21T09:30:00.000Z",
      },
      {
        id: "msg-sunday-2",
        creator: currentUser,
        participants: sundayPeople,
        subject:
          "I'll bring the almond cake. Tell her not to make a second one.",
        createdAt: "2026-10-21T11:15:00.000Z",
      },
    ],
    lastMessageAt: "2026-10-21T11:15:00.000Z",
    label: familyLabel,
    read: true,
    starred: false,
    archived: false,
  },
  {
    id: "topic-escalation",
    subject: "Escalation: reading pane shows the previous thread",
    creator: mara,
    participants: escalationPeople,
    messages: escalationMessages,
    lastMessageAt: "2026-10-09T15:48:00.000Z",
    label: workLabel,
    read: true,
    starred: false,
    archived: false,
  },
  {
    id: "topic-gym",
    subject: "Membership renewal confirmation",
    creator: priya,
    participants: gymPeople,
    messages: [
      {
        id: "msg-gym-1",
        creator: priya,
        participants: gymPeople,
        subject:
          "You're renewed through next October. Receipt is in the portal.",
        createdAt: "2026-10-02T07:30:00.000Z",
      },
    ],
    lastMessageAt: "2026-10-02T07:30:00.000Z",
    label: personalLabel,
    read: true,
    starred: false,
    archived: true,
  },
  {
    id: "topic-offsite",
    subject: "Offsite recap and action items",
    creator: tomas,
    participants: offsitePeople,
    messages: [
      {
        id: "msg-offsite-1",
        creator: tomas,
        participants: offsitePeople,
        subject:
          "Recap below. Owners are in bold, dates are soft except the audit.",
        createdAt: "2026-09-18T16:05:00.000Z",
      },
      {
        id: "msg-offsite-2",
        creator: finn,
        participants: offsitePeople,
        subject:
          "Taking the accessibility audit. Will have findings by the 30th.",
        createdAt: "2026-09-19T10:48:00.000Z",
      },
    ],
    lastMessageAt: "2026-09-19T10:48:00.000Z",
    label: null,
    read: true,
    starred: false,
    archived: true,
  },
];
