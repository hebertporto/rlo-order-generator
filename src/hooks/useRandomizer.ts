import { useState } from "react";
import orderBy from "lodash/orderBy";
import shuffle from "lodash/shuffle";

interface IuseRandomizerProps {
  list: Array<{ name: string; isMissing: boolean }>;
  standupOrderList: Array<{ name: string; isMissing: boolean }>;
  getAlphabeticalOrder: () => void;
  getRandomOrder: () => void;
  copyToClipboard: (items: any) => void;
  updateIsMissing: (memberName: string) => void;
  isListCopied: boolean;
}

const rloTeam = [
  { isMissing: false, name: "Lindsey" },
  { isMissing: false, name: "Ribamar" },
  { isMissing: false, name: "Courtney" },
  { isMissing: false, name: "Giuliano" },
  { isMissing: false, name: "Vlad" },
  { isMissing: false, name: "Isabelle" },
  { isMissing: false, name: "Kyle" },
  { isMissing: false, name: "Diogo" },
  { isMissing: false, name: "Sai" },
  { isMissing: false, name: "Vandana" },
  { isMissing: false, name: "Hebert" },
  { isMissing: true, name: "Deepanshu" },
  { isMissing: true, name: "Felipe" },
];

const useRandomizer = (): IuseRandomizerProps => {
  const [list, setList] = useState(rloTeam);
  const [standupOrderList, setStandupOrderList] = useState([]);
  const [isListCopied, setIsListCopied] = useState(false);

  const updateIsMissing = (memberName) => {
    const updatedList = list.map(({ name, isMissing }) => {
      if (memberName === name) {
        return { name, isMissing: !isMissing };
      }
      return { name, isMissing };
    });
    setList(updatedList);
  };

  const selectisMissing = () => list.filter((person) => !person.isMissing);

  const getAlphabeticalOrder = () =>
    setStandupOrderList(orderBy(selectisMissing(), "name", "asc"));

  const getRandomOrder = () => setStandupOrderList(shuffle(selectisMissing()));

  const copyToClipboard = (items) => {
    const nameList = [];
    items.forEach((child) => {
      nameList.push(`${child.textContent}\n`);
    });

    const el = document.createElement("textarea");
    el.value = nameList.join("");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setIsListCopied(true);
    setInterval(() => setIsListCopied(false), 4000);
  };

  return {
    list,
    standupOrderList,
    getAlphabeticalOrder,
    getRandomOrder,
    copyToClipboard,
    updateIsMissing,
    isListCopied,
  };
};

export { useRandomizer };
