import styles from "../offer-form.module.scss";

import LabelWrapper from "../LabelWrapper/LabelWrapper";

interface Select {
  value: string;
  text: string;
}

interface Props {
  handleChangeInformations: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const selectOptions: Select[] = [];

for (let i = 1; i <= 7; i++) {
  selectOptions.push({
    value: String(i),
    text: i === 1 ? `${i} day` : `${i} days`,
  });
}

const SelectField = ({ handleChangeInformations }: Props) => {
  const displaySelect = selectOptions.map((item: Select) => (
    <option key={item.text} value={item.value}>
      {item.text}
    </option>
  ));

  return (
    <>
      <LabelWrapper number="4" label="Other" />
      <label className={styles.label}>Expire time</label>
      <select
        className={styles.select}
        name="expirationDate"
        onChange={handleChangeInformations}
      >
        {displaySelect}
      </select>
    </>
  );
};

export default SelectField;
