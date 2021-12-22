import type { ActionFunction } from "remix";
import { useActionData, redirect, json } from "remix";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return `Report context is too short, Please Elaborate`;
  }
}

function validateJokeName(name: string) {
  if (name.length < 2) {
    return `Report Jira is too short`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    jiraId: string | undefined;
    jiraContext: string | undefined;
  };
  fields?: {
    jiraId: string;
    jiraContext: string;
  };
};

const badRequest = (data: ActionData) =>
  json(data, { status: 400 });

export const action: ActionFunction = async ({
  request
}) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const jiraId = form.get("jiraId");
  const jiraContext = form.get("jiraContext");
  if (
    typeof jiraId !== "string" ||
    typeof jiraContext !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`
    });
  }

  const fieldErrors = {
    jiraId: validateJokeName(jiraId),
    jiraContext: validateJokeContent(jiraContext)
  };
  const fields = { jiraId, jiraContext };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  console.log(fields);
  const joke = await db.reports.create({ data: { ...fields, reporterId: userId }});
  return redirect(`/reports`);
};

export default function createRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <p>Add your Jira report</p>
      <form method="post">
        <div>
          <label>
            Jira Id:{" "}
            <input
              type="text"
              defaultValue={actionData?.fields?.jiraId}
              name="jiraId"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.jiraId) ||
                undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.jiraId
                  ? "name-error"
                  : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.jiraId ? (
            <p
              className="form-validation-error"
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors.jiraId}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Jira Content:{" "}
            <textarea
              defaultValue={actionData?.fields?.jiraContext}
              name="jiraContext"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.jiraContext) ||
                undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.jiraContext
                  ? "content-error"
                  : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.jiraContext ? (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.jiraContext}
            </p>
          ) : null}
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}