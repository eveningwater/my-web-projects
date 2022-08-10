class Elevator {
  constructor(count) {
    this.count = count;
    this.onFloor = 1;
    this.btnGroup = null;
    this.zoneContainer = this.$(".ew-elevator-storey-zone");
    this.elevator = this.$(".ew-elevator");
    this.generateStorey(this.count || 6);
  }
  $(selector, el = document) {
    return el.querySelector(selector);
  }
  $$(selector, el = document) {
    return el.querySelectorAll(selector);
  }
  generateStorey(count) {
    let template = "";
    for (let i = count - 1; i >= 0; i--) {
      template += `
                <div class="ew-elevator-storey">
                    <div class="ew-elevator-controller">
                        <button type="button" class="ew-elevator-to-top ew-elevator-btn" ${
                          i === count - 1 ? "disabled" : ""
                        }>↑</button>
                        <button type="button" class="ew-elevator-to-bottom ew-elevator-btn" ${
                          i === 0 ? "disabled" : ""
                        }>↓</button>
                    </div>
                    <div class="ew-elevator-count">${i + 1}</div>
                </div>
            `;
    }
    this.zoneContainer.innerHTML = template;
    this.storeys = this.$$(".ew-elevator-storey", this.zoneContainer);
    this.doors = this.$$(".ew-elevator-door", this.elevator);
    this.btnGroup = this.$$(".ew-elevator-btn", this.zoneContainer);
    [...this.storeys].forEach((item, index) => {
      this.handleClick(
        this.$$(".ew-elevator-btn", item),
        item.offsetHeight,
        index
      );
    });
  }
  handleClick(btnGroup, floorHeight, floorIndex) {
    Array.from(btnGroup).forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("checked")) {
          return;
        }
        btn.classList.add("checked");
        const currentFloor = this.count - floorIndex;
        const moveFloor = currentFloor - 1;
        this.elevatorMove(currentFloor, floorHeight * moveFloor);
      });
    });
  }
  elevatorMove(num, offset) {
    const currentFloor = this.onFloor;
    const diffFloor = Math.abs(num - currentFloor);

    this.addStyles(this.elevator, {
      transitionDuration: diffFloor + "s",
      bottom: offset + "px",
    });

    Array.from(this.doors).forEach((door) => {
      door.classList.add("toggle");
      this.addStyles(door, {
        animationDelay: diffFloor + "s",
      });
    });

    $message.success(
      `本美女就要出来了，请速速来迎接,再等${
        (diffFloor * 1000 + 3000) / 1000
      }s就关电梯门了!`
    );

    setTimeout(() => {
      [...this.btnGroup].forEach((btn) => btn.classList.remove("checked"));
    }, diffFloor * 1000);

    setTimeout(() => {
      Array.from(this.doors).forEach((door) => door.classList.remove("toggle"));
    }, diffFloor * 1000 + 3000);

    this.onFloor = num;
  }
  addStyles(el, styles) {
    Object.assign(el.style, styles);
  }
}

