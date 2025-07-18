import { numberToCurrencyWords, numberToWords } from "@codeshumon/number-to-words";


const Page = () => {
  // Now TypeScript won't complain about these
  console.log(numberToWords(53368.5588, {noComa : true, titleCase: true} ));
  console.log(numberToCurrencyWords("53368.5588", {noComa : true, titleCase: true}));

  return (
    <div>
      <div>{numberToWords(53368.5588, {noComa : true, titleCase: true})}</div>
      <div>{numberToCurrencyWords("53368.5588", {noComa : true, titleCase: true, noHypen: true})}</div>
    </div>
  );
};

export default Page;