import { useAuth } from "./auth/authCheck";

export default function CreateTicketForm({ form, handleChange, handleSubmit, loading }) {
    const MAX_DESC_LENGTH = 500;
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-primary">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g., API connection failing"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Priority Selector */}
                {/* <div>
                    <label htmlFor="priority" className="label">
                        <span className="label-text">Priority</span>
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div> */}

                {/* Description Textarea */}
                <div>
                    <label htmlFor="description" className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the issue in detail"
                        className="textarea textarea-bordered w-full h-36"
                        maxLength={MAX_DESC_LENGTH}
                        required
                    ></textarea>
                    <label className="label">
                        <span className="label-text-alt"></span>
                        <span className="label-text-alt">{form.description.length} / {MAX_DESC_LENGTH}</span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    className="btn btn-primary w-full !mt-6"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Ticket"}
                </button>
            </form>
        </div>
    );
}