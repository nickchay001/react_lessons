import React from "react";
import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("status from props shoud be in the state", () => {
        const component = create(<ProfileStatus status="may"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("may")
    });
    test("after creation <span> should be disolayed", () => {
        const component = create(<ProfileStatus status="may"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation <input> should be disolayed", () => {
        const component = create(<ProfileStatus status="may"/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="may"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("may")
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="may"/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("may")
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="may" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1)
    });
});