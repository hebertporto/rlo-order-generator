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
}

const rloTeam = [
  { isMissing: false, name: "Hebert" },
  { isMissing: false, name: "Lucas" },
  { isMissing: false, name: "Thiago" },
  { isMissing: false, name: "Ribamar" },
  { isMissing: false, name: "Nico" },
  { isMissing: false, name: "Courtney" },
  { isMissing: false, name: "Eduard" },
  { isMissing: false, name: "Gustavo" },
  { isMissing: false, name: "Giuliano" },
  { isMissing: false, name: "Eddie" },
  { isMissing: false, name: "Vlad" },
  { isMissing: false, name: "Bode" },
  { isMissing: false, name: "Sandra" },
  { isMissing: true, name: "Deepanshu" },
  { isMissing: true, name: "Rafael" },
];

const useRandomizer = (): IuseRandomizerProps => {
  const [list, setList] = useState(rloTeam);
  const [standupOrderList, setStandupOrderList] = useState([]);

  const updateIsMissing = (memberName) => {
    const updatedList = list.map(({ name, isMissing }) => {
      if (memberName === name) {
        return { name, isMissing: !isMissing };
      }
      return { name, isMissing };
    });
    setList(updatedList);
  };

  const selectisMissing = () => rloTeam.filter((person) => !person.isMissing);

  const getAlphabeticalOrder = () =>
    setStandupOrderList(orderBy(selectisMissing(), "name", "asc"));

  const getRandomOrder = () => setStandupOrderList(shuffle(selectisMissing()));

  const copyToClipboard = (items) => {
    const nameList = [];
    items.forEach((child, index) => {
      nameList.push(`${child.textContent}\n`);
    });

    const el = document.createElement("textarea");
    el.value = nameList.join("");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return {
    list,
    standupOrderList,
    getAlphabeticalOrder,
    getRandomOrder,
    copyToClipboard,
    updateIsMissing,
  };
};

export { useRandomizer };
