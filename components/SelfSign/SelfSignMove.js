import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import dynamic from "next/dynamic";
import { createRef, useCallback, useEffect, useState } from "react";

const Moveable = dynamic(() => import("react-moveable"), {
  ssr: false,
});

const SignMove = ({
  images,
  bounds,
  frame,
  updateFrame,
  removeSign,
  currentRef,
  line,
  id,
}) => {
  const [target, setTarget] = useState();
  const moveableRef = createRef(null);

  const onWindowResize = useCallback(() => {
    moveableRef?.current?.updateTarget();
  }, []);

  useEffect(() => {
    setTarget(document.querySelector(`.sign_${id} .images_sign`));
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onWindowResize]);

  return (
    <div>
      <div style={{ position: "relative", zIndex: 1 }} className={`sign_${id}`}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
            transform: `translate(${frame?.translate[0]}px, ${frame?.translate[1]}px)`,
          }}
        >
          {line && (
            <Tooltip title="Remove Stamp">
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                onClick={() => {
                  removeSign(id);
                }}
              />
            </Tooltip>
          )}
        </div>
        <img
          src={`data:image/jpeg;base64,${images}`}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate(${frame?.translate[0]}px, ${frame?.translate[1]}px)`,
            width: frame?.width,
            height: frame?.height,
          }}
          className={`images_sign`}
        />
      </div>

      <Moveable
        renderDirections={["se"]}
        ref={moveableRef}
        snappable
        bounds={{ left: 0, top: 0, right: bounds.width, bottom: bounds.height }}
        origin={false}
        scrollable
        scrollContainer={currentRef}
        scrollThreshold={0}
        onScroll={({ scrollContainer, direction }) => {
          scrollContainer.scrollLeft += direction[0] * 10;
          scrollContainer.scrollTop += direction[1] * 10;
        }}
        throttleDrag={0}
        originDraggable={false}
        draggable={line}
        keepRatio
        hideDefaultLines={!line}
        target={target}
        resizable={line}
        throttleResize={0}
        onResizeStart={({ setOrigin, dragStart }) => {
          setOrigin(["%", "%"]);
          dragStart && dragStart?.set(frame?.translate);
        }}
        onResize={({ target, width, height, drag }) => {
          const beforeTranslate = drag?.beforeTranslate;

          updateFrame({ id, type: "translate", value: beforeTranslate });
          updateFrame({ id, type: "width", value: width });
          updateFrame({ id, type: "height", value: height });

          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onDragStart={({ clientX, set, clientY, target }) => {
          set(frame?.translate);
        }}
        onDrag={({ target, beforeTranslate, left, top, delta }) => {
          updateFrame({ id, type: "translate", value: beforeTranslate });
        }}
        onRotateStart={({ set }) => {
          set(frame.rotate);
        }}
        onRender={({ target }) => {
          const { translate } = frame;
          target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
        }}
      />
    </div>
  );
};

export default SignMove;
