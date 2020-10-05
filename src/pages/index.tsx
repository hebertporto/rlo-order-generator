import React from "react";
import Layout from "components/layout";
import { useRandomizer } from "hooks/useRandomizer";

function IndexPage() {
  const {
    list,
    getAlphabeticalOrder,
    getRandomOrder,
    copyToClipboard,
    standupOrderList,
    updateIsMissing,
    isListCopied,
  } = useRandomizer();

  const handleCopyList = () =>
    copyToClipboard(document.getElementById("standUpList").childNodes);

  return (
    <Layout>
      <h1 className="text-center text-4xl font-semibold">
        Standup Order Generator{" "}
        <small className="text-gray-500 text-sm">beta</small>
      </h1>
      <section className=" flex flex-row mt-8">
        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-row">
            <button
              onClick={getAlphabeticalOrder}
              className="rounded-lg bg-blue-500 text-sm text-white px-3 py-2 outline-none"
            >
              Alphabetical
            </button>
            <button
              onClick={getRandomOrder}
              className="ml-6 rounded-lg bg-blue-500 text-sm text-white px-3 py-2 outline-none"
            >
              Random
            </button>
          </div>
          <div className="bg-indigo-200 font-sans py-2 px-2 rounded-t-lg text-center font-semibold w-64 mt-5">
            RLO Team
          </div>
          <ul className="box-border border-2 border-gray-400 w-64 border-b-0">
            {list.map(({ name, isMissing }) => {
              return (
                <li key={name} className="py-2 px-2 border-b-2 bg-white">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="hidden"
                        onChange={() => updateIsMissing(name)}
                        checked={isMissing}
                      />
                      <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
                      <div className="toggle__dot absolute w-6 h-6 bg-gray-100 rounded-full shadow inset-y-0 left-0" />
                    </div>
                    <div className="ml-3 text-gray-700 font-medium">{name}</div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <button
            onClick={handleCopyList}
            className={`w-40 rounded-lg text-sm text-white px-3 py-2 outline-none ${
              standupOrderList.length ? "" : "cursor-not-allowed opacity-50"
            } ${isListCopied ? "bg-teal-500" : "bg-blue-500"}`}
            disabled={!standupOrderList.length}
          >
            {isListCopied ? "List Copied!" : "Copy to Clipboard"}
          </button>
          {standupOrderList.length ? (
            <>
              <div className="w-64 mt-5 bg-green-300 text-gray-900 font-sans py-2 px-2 rounded-t-lg text-center font-semibold">
                Standup Order
              </div>
              <ul
                id="standUpList"
                className="box-border border-2 border-gray-400 border-b-0 w-64"
              >
                {standupOrderList.map(({ name }, index) => {
                  return (
                    <li className="py-2 px-2 border-b-2" key={name}>
                      {index + 1} - {name}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}

export default IndexPage;
