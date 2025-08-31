import { useState } from "react";

type Props = {
  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;
};

const availableColumns = [
  "methane",
  "oil_co2",
  "temperature_change_from_co2",
  "cement_co2",
  "flaring_co2",
];

export default function ColumnsModal({
  selectedColumns,
  setSelectedColumns,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== col));
    } else {
      setSelectedColumns([...selectedColumns, col]);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={() => setOpen(true)}>Select columns</button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Please, select columns</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {availableColumns.map((col) => (
                <label key={col}>
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col)}
                    onChange={() => toggleColumn(col)}
                  />{" "}
                  {col}
                </label>
              ))}
            </div>
            <button
              style={{ marginTop: "10px" }}
              onClick={() => setOpen(false)}
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
