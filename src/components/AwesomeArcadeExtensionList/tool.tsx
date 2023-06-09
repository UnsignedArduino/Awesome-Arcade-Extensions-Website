import { Tool, ToolRef, URLLink } from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";
import Link from "next/link";
import { smoothScrollHash } from "@/components/AwesomeArcadeExtensionList/linkableHeader";
import { AnalyticEvents } from "@/components/Analytics";

export function AwesomeArcadeTool({
  tool,
  pad,
}: {
  tool: Tool;
  pad?: boolean | undefined;
}): JSX.Element {
  const [showCardLink, setShowCardLink] = React.useState(false);

  return (
    <div className={`card ${pad ? "mb-2" : ""} h-100`} id={tool.repo}>
      <div className="card-body">
        <h5
          className="card-title"
          onMouseEnter={() => {
            setShowCardLink(true);
          }}
          onMouseLeave={() => {
            setShowCardLink(false);
          }}
        >
          {tool.title}
          {showCardLink ? (
            <Link
              className="ms-1"
              href={`/#${tool.repo}`}
              onClick={smoothScrollHash}
            >
              <i className="bi-link-45deg" />
            </Link>
          ) : undefined}
        </h5>
        <h6 className="card-subtitle mb-2 ttool-body-secondary">
          Made by{" "}
          <a
            href={`https://github.com/${tool.author}`}
            target="_blank"
            rel="noopener noreferer"
          >
            {tool.author}
          </a>
        </h6>
        <>
          Access this tool at:
          <blockquote className="border-start border-secondary border-2 ps-3 mt-1 mb-2">
            <a
              className="text-start"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ wordBreak: "break-all" }}
              onClick={() => {
                AnalyticEvents.sendAwesomeClick(tool.repo);
              }}
            >
              {tool.url}
            </a>
          </blockquote>
        </>
        <div
          className="card-ttool"
          dangerouslySetInnerHTML={{ __html: tool.description }}
        />
        <ul className="list-inline mb-0">
          {tool.links.map((link: URLLink) => {
            return (
              <li key={link.url} className="list-inline-item">
                <a
                  href={link.url}
                  className="card-link ms-0 me-3"
                  // style={{ whiteSpace: "nowrap" }}
                  target="_blank"
                  rel="noopener noreferer"
                >
                  {link.label != undefined ? link.label : link.url}
                </a>
              </li>
            );
          })}
        </ul>
        {tool.forks != undefined && tool.forks.length > 0 ? (
          <div className="mt-3">
            <div className="alert alert-primary mb-0" role="alert">
              There {tool.forks.length === 1 ? "is" : "are"}{" "}
              <b>{tool.forks.length}</b> fork
              {tool.forks.length !== 1 ? "s" : ""} available:
              <ul>
                {tool.forks.map((t: ToolRef) => {
                  return (
                    <li key={t.repo}>
                      <Link href={`/#${t.repo}`} onClick={smoothScrollHash}>
                        {t.repo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : undefined}
        {tool.depreciatedBy != undefined && tool.depreciatedBy.length > 0 ? (
          <div className="mt-3">
            <div className="alert alert-warning mb-0" role="alert">
              This tool is depreciated by <b>{tool.depreciatedBy.length}</b>{" "}
              other tool{tool.depreciatedBy.length !== 1 ? "s" : ""}:
              <ul>
                {tool.depreciatedBy.map((t: ToolRef) => {
                  return (
                    <li key={t.repo}>
                      <Link href={`/#${t.repo}`} onClick={smoothScrollHash}>
                        {t.repo}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : undefined}
      </div>
    </div>
  );
}

export function AwesomeArcadeToolGroup({
  title,
  description,
  tools,
  pad,
}: {
  title?: JSX.Element | undefined;
  description?: JSX.Element | undefined;
  tools: Tool[];
  pad?: boolean | undefined;
}): JSX.Element {
  return (
    <div className={pad == undefined || pad ? "mb-3" : ""}>
      {title}
      {description}
      {tools.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {tools.map((tool, i) => {
            return (
              <div className="col py-3" key={tool.repo}>
                <AwesomeArcadeTool tool={tool} pad={i < tools.length - 1} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          Could not find any results with your search query!
        </div>
      )}
    </div>
  );
}
