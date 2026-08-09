import Input from "../UI/Input/Input";

function StudentFields({ form, handleChange }) {
  return (
    <>
      <Input
        label="College / University"
        name="college"
        value={form.college}
        onChange={handleChange}
        placeholder="Enter your college"
      />

      <Input
        label="Branch"
        name="branch"
        value={form.branch}
        onChange={handleChange}
        placeholder="CSE, IT, ECE..."
      />

      <Input
        label="Current Year"
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="1st / 2nd / 3rd / 4th"
      />

      <Input
        label="Skills"
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="React, Java, Python..."
      />
    </>
  );
}

export default StudentFields;